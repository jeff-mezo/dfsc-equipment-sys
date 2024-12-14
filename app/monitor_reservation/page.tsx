"use client";

import { useState, useEffect } from "react";
import { ReservationCard } from "./components/reservation-card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/config/supabaseClient";
import useUser from "../hook/useUser";

// Updated Reservation type with string-based status
type Reservation = {
  id: number;
  name: string;
  status: 'accepted' | 'pending' | 'denied';
  adviser: string;
  borrower_id: string;
  created_at: string;
  project: string;
};

type Profiles = {
  id: string;
  name: string;
};

type Cart = {
  id: number;
  eqname: string;
  quantity: number;
  borrow_date: string;
  return_date: string;
  reservation_id: number;
};

export default function Dashboard() {
  const { data: user, isLoading: userLoading, isError: userError } = useUser();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [profiles, setProfiles] = useState<Profiles[]>([]);
  const [carts, setCarts] = useState<Cart[]>([]);
  const [filter, setFilter] = useState<'all' | 'accepted' | 'pending' | 'denied'>('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch reservations, profiles, and carts
  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);

        // Fetch reservations
        const { data: reservationData, error: reservationError } = await supabase
          .from("reservationform")
          .select("*")
          .eq("borrower_id", user.id);

        // Fetch profiles
        const { data: profileData, error: profileError } = await supabase.from("profiles").select("*");

        // Fetch carts
        const { data: cartData, error: cartError } = await supabase.from("cart_items").select("*");

        // Check for errors
        if (reservationError) throw new Error(reservationError.message);
        if (profileError) throw new Error(profileError.message);
        if (cartError) throw new Error(cartError.message);

        setReservations(reservationData as Reservation[]);
        setProfiles(profileData as Profiles[]);
        setCarts(cartData as Cart[]);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  // Updated filter logic with string-based status
  const filteredReservations = reservations.filter((reservation) =>
    filter === 'all'
      ? true
      : filter === 'accepted'
      ? reservation.status === 'accepted'
      : filter === 'pending'
      ? reservation.status === 'pending'
      : reservation.status === 'denied'
  );

  // Helper function to retrieve borrower name
  const getBorrower = (borrowerId: string): Profiles =>
    profiles.find((profile) => profile.id === borrowerId) || { id: '', name: 'Unknown' };

  // Handle loading and error states
  if (userLoading || loading) return <div>Loading...</div>;
  // if (userError || error) return <div>Error: {userError?.message || error}</div>;
  if (!user?.id) return <div>Please log in to view your reservations.</div>;

  return (
    <div className="container mx-auto p-4 mt-10">
      <h1 className="text-2xl font-bold mb-4">Your Equipment Reservations</h1>

      {/* Filter buttons */}
      <div className="flex justify-between items-center mb-4">
        <div className="space-x-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'accepted' ? 'default' : 'outline'}
            onClick={() => setFilter('accepted')}
          >
            Accepted
          </Button>
          <Button
            variant={filter === 'pending' ? 'default' : 'outline'}
            onClick={() => setFilter('pending')}
          >
            Pending
          </Button>
          <Button
            variant={filter === 'denied' ? 'default' : 'outline'}
            onClick={() => setFilter('denied')}
          >
            Denied
          </Button>
        </div>

        {/* Dropdown filter */}
        <Select onValueChange={(value: 'all' | 'accepted' | 'pending' | 'denied') => setFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="denied">Denied</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reservations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredReservations.length > 0 ? (
          filteredReservations.map((reservation) => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              cartItems={carts.filter((cart) => cart.reservation_id === reservation.id)}
              borrower={getBorrower(reservation.borrower_id)}
            />
          ))
        ) : (
          <div className="text-muted-foreground text-center w-full">
            No reservations found for the selected filter.
          </div>
        )}
      </div>
    </div>
  );
}