import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, UserIcon, BookIcon, PackageIcon } from 'lucide-react'

// Data type imports
// Define data types for reservations, profiles, and cart items
type Reservation = {
  id: number
  name: string
  status: boolean | null // true = accepted, false = rejected, null = pending
  adviser: string
  borrower_id: string
  created_at: string
  project: string
}

type Profiles = {
  id: string
  name: string
}

type Cart = {
  id: number
  eqname: string
  quantity: number
  borrow_date: string
  return_date: string
  reservation_id: number
}


export function ReservationCard({
  reservation,
  cartItems,
  borrower
}: {
  reservation: Reservation
  cartItems: Cart[]
  borrower: Profiles
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          {reservation.name}
        </CardTitle>
        <Badge
          variant={
            reservation.status === true
              ? "default"
              : reservation.status === false
              ? "destructive"
              : "secondary"
          }
        >
          {reservation.status === true
            ? "Accepted"
            : reservation.status === false
            ? "Rejected"
            : "Pending"}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <UserIcon className="h-4 w-4" />
            <span>Borrower: {borrower.name}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <BookIcon className="h-4 w-4" />
            <span>Adviser: {reservation.adviser}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <CalendarIcon className="h-4 w-4" />
            <span>Created: {new Date(reservation.created_at).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <PackageIcon className="h-4 w-4" />
            <span>Project: {reservation.project}</span>
          </div>
        </div>
        <div className="mt-4">
          <h4 className="text-sm font-semibold mb-2">Equipment:</h4>
          <ul className="space-y-1">
            {cartItems.map((item) => (
              <li key={item.id} className="text-sm">
                {item.eqname} (Qty: {item.quantity}) - {item.borrow_date} to {item.return_date}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
