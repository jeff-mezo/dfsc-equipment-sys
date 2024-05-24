import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"



const admin_profile = () => {
    return ( 
        <div className="bg-gray-100 min-h-screen flex flex-col sm:flex-row justify-center items-center gap-8">
        <div className="bg-white p-8 rounded-lg shadow-md w-96 flex flex-col">
            <div className="flex flex-col items-center">
                <Avatar className="w-24 h-24 rounded-full mx-auto mb-2">
                    <AvatarImage src="userimg.png"/>
                </Avatar>
                <Badge className="mb-2 bg-green-700">Verified</Badge>
            </div>
            <div className="text-center mt-4">
                <h1 className="text-l font-semibold">Dann Marie del Mundo</h1>
                <p className="text-gray-600 text-sm">Name</p>
                <p className="text-l font-semibold mt-4">cmiscroscope@up.edu.ph</p>
                <p className="text-gray-600 text-sm">Email</p>
                <p className="font-semibold mt-4">2024-001</p>
                <p className="text-gray-600 text-sm">Admin ID</p>
            </div>
            <div className="flex flex-col items-center justify-center mt-8">
                <form>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="px-12 w-60 up-primary-red">Update Information</Button>                    
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                id="admin-name"
                                className="col-span-3 border-black"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">
                                    Email
                                </Label>
                                <Input
                                id="admin-email"
                                className="col-span-3 border-black"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" className="up-primary-red">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                </form>
                <Link href="/admin"><Button className="px-10 w-60 mt-4 up-primary-red">Manage Request</Button></Link>
            </div>
        </div>
        
    </div>
     );
}
 
export default admin_profile;