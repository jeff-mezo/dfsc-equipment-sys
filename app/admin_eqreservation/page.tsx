'use client'

import { useState, useMemo, useEffect } from 'react'
import { User, Package, Calendar, Check, X, Trash2, Search, SortAsc, SortDesc } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase } from '@/config/supabaseClient'
import { Database } from '@/lib/types/supabase'

// Mock data for users with reservations
const users = [
  { id: 1, name: 'Alice Josadsahnson', email: 'alice@example.com', reservationDate: '2023-05-01', status: 'pending', items: [
    { id: 101, name: 'Laptasdasdop', serialNumber: 'LT001', checkoutDate: '2023-05-01', returnDate: '2023-05-15' },
    { id: 102, name: 'Projector', serialNumber: 'PJ001', checkoutDate: '2023-05-01', returnDate: '2023-05-03' }
  ]},
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', reservationDate: '2023-05-02', status: 'pending', items: [
    { id: 103, name: 'Camera', serialNumber: 'CM001', checkoutDate: '2023-05-02', returnDate: '2023-05-09' }
  ]},
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', reservationDate: '2023-05-03', status: 'pending', items: [
    { id: 104, name: 'Microphone', serialNumber: 'MC001', checkoutDate: '2023-05-03', returnDate: '2023-05-05' },
    { id: 105, name: 'Speakers', serialNumber: 'SP001', checkoutDate: '2023-05-03', returnDate: '2023-05-05' },
    { id: 106, name: 'Tripod', serialNumber: 'TP001', checkoutDate: '2023-05-03', returnDate: '2023-05-05' },
    { id: 107, name: 'Lighting Kit', serialNumber: 'LK001', checkoutDate: '2023-05-03', returnDate: '2023-05-05' }
  ]},
]

type Reservaton = {
  status: boolean;
  adviser: string;
  borrower_id: string;
  created_at: string;
  id: number;
  project: string;
};

type Profiles = {
  id: string;
  name: string;
}


type Cart = {
  id: number;
  eqname: string;
  quantity: number;
  borrow_date: string;
  return_date: string;
  reservation_id: number;
}


export default function EquipmentReservation() {
  
  //FETCH RESERVATION DATA


  const [reservations, setReservations] = useState<Reservaton[]>([]);
  const [cart, setCarts] = useState<Cart[]>([]);
  const [profiles, setProfiles] = useState<Profiles[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  useEffect(() => {
    const fetchData = async () => {
      const {data: reservationData, error: reservationError} = await supabase.from('reservationform').select('*')
      const {data: profileData, error: profileError} = await supabase.from('profiles').select('*')
      const {data: cartData, error: cartError} = await supabase.from('cart_items').select('*')
    
        
      if(reservationError) {
        console.error('Error fetching reservations: ', reservationError);
      } else {
        setReservations(reservationData as Reservaton[]);
      }

      if(profileError) {
        console.error('Error fetching reservations: ', profileError);
      } else {
        setProfiles(profileData as Profiles[]);
      }

      if(cartError) {
        console.error('Error fetching reservations: ', cartError);
      } else {
        setCarts(cartData as Cart[]);
      }
    };

    fetchData();

  }, [])


  const handleAction = (userId:number , action:boolean) => {
    setReservations(prevReservations => 
      prevReservations.map(user => 
        user.id === userId 
          ? { ...user, status: action === true ? true :  false }
          : user
      ).filter(user => user.status == false)
    )
  }
  const filteredAndSortedReservations = useMemo(() => {

    const mergedData = reservations.map(reservation => {      
      const borrowerProfile = profiles.find(profile => profile.id === reservation.borrower_id);      
      return {        
        ...reservation,        
        borrowerName: borrowerProfile ? borrowerProfile.name : 'Unknown',      
      };    
    });

    return mergedData
      .filter(reservation =>  (reservation.borrowerName.toLowerCase().includes(search.toLowerCase()))
      ||  reservation.adviser.toLowerCase().includes(search.toLowerCase())
      &&  (statusFilter === 'all' || reservation.status === (statusFilter === 'active'))
      )
      .sort((a, b) => {        
        const dateA = new Date(a.created_at).getTime();        
        const dateB = new Date(b.created_at).getTime();        
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;      
      });
  }, [reservations, profiles, search, statusFilter, sortOrder]);


  // const filteredAndSortedReservations = useMemo(() => {   OLD PROCESS, for reference only
  //   return reservations
  //     .filter(user => 
  //       (user.name.toLowerCase().includes(search.toLowerCase()) ||
  //        user.email.toLowerCase().includes(search.toLowerCase())) &&
  //       (statusFilter === 'all' || user.status === statusFilter)
  //     )
  //     .sort((a, b) => {
  //       const dateA = new Date(a.reservationDate).getTime()
  //       const dateB = new Date(b.reservationDate).getTime()
  //       return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
  //     })
  // }, [reservations, search, statusFilter, sortOrder])

  
  
  // FIX ICON ERROR
  interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
  }

  const Input: React.FC<InputProps> = ({ icon, ...props }) => (
    <div className="relative w-full">
      {icon && <span className="absolute left-2 top-1/2 transform -translate-y-1/2">{icon}</span>}
      <input {...props} className={`${props.className} pl-8`} />
    </div>
  );

  // FIX BADGE variant ERROR:
  

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Equipment Reservations</h1>
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
              <Input
                placeholder="Search by name or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
                icon={<Search className="h-4 w-4 text-muted-foreground" />}
              />

              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="denied">Denied</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
              </Button>
            </div>


            <div className="grid gap-4">
              {filteredAndSortedReservations.map((reservation) => (
                <Dialog key={reservation.id}>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full justify-start text-left font-normal h-auto py-4 px-4"
                    >
                      <div className="flex flex-col w-full">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <User className="mr-2 h-4 w-4" />
                            <span className="font-medium">{reservation.borrowerName}</span>
                          </div>
                          <Badge
                            variant={ // !!! STILL NEED TO CHANGE BOOLEAN STATUS TO NEW 
                              reservation.status === false
                                ? 'secondary'
                                : reservation.status === true
                                ? 'default' // replace "default" with any available variant you prefer
                                : 'destructive'
                            }
                          >
                            {reservation.status === true ? 'accepted' : 'pending'}
                          </Badge>

                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>{reservation.created_at}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium mb-1">Reserved Items:(!WIP)</span>
                          {/* {user.items.slice(0, 3).map((item, index) => (
                            <span key={item.id} className="text-sm ml-2">• {item.name}</span>
                          ))} */}
                          {/* {user.items.length > 3 && (
                            <span className="text-sm ml-2">• +{user.items.length - 3} more</span>
                          )} */}
                        </div>
                      </div>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                      <DialogTitle>{reservation.borrowerName}&apos;s Reservations</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                      <div>
                        <strong>Email:</strong> {reservation.borrowerName}
                      </div>
                      <div>
                        <strong>Reservation Date:</strong> {reservation.created_at}
                      </div>
                      <div>
                        <strong>Status:</strong> <Badge>{reservation.status}</Badge>
                      </div>
                      <div>
                        <strong>Total Items:</strong> !WIP
                      </div>
                      <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Item</TableHead>
                              <TableHead>Quantity</TableHead>
                              <TableHead>Checkout Date</TableHead>
                              <TableHead>Return Date</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody> 
                            {cart.map((item) => (
                              <TableRow key={reservation.id}>
                                <TableCell className="font-medium">{reservation.id === item.reservation_id ? item.eqname : null}</TableCell>
                                {/* <TableCell>{item.serialNumber}</TableCell>
                                <TableCell>{item.checkoutDate}</TableCell>
                                <TableCell>{item.returnDate}</TableCell> */}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                      <div className="flex justify-end space-x-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                //onClick={() => handleAction(user.id, 'accept')}
                                //disabled={user.status !== 'pending'}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Accept Reservation</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                //onClick={() => handleAction(user.id, 'deny')}
                                //disabled={user.status !== 'pending'}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Deny Reservation</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                //onClick={() => handleAction(user.id, 'delete')}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete Reservation</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}