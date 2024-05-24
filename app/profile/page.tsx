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


const profile = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col sm:flex-row justify-center items-center gap-8 pt-20">
            <div className="bg-white p-8 rounded-lg shadow-md w-96 flex flex-col">
                <div className="flex flex-col items-center">
                    <Avatar className="w-24 h-24 rounded-full mx-auto mb-2">
                        <AvatarImage src="userimg.png"/>
                    </Avatar>
                    <Badge className="mb-4 up-primary-red">Unverified</Badge>
                </div>
                <div className="text-center mt-4">
                    <h1 className="text-l font-semibold">Compound Microscope</h1>
                    <p className="text-gray-600 text-sm">Name</p>
                    <p className="text-l font-semibold mt-4">cmiscroscope@up.edu.ph</p>
                    <p className="text-gray-600 text-sm">Email</p>
                    <p className="font-semibold mt-4">0995 250 1904</p>
                    <p className="text-gray-600 text-sm">Contact Number</p>
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
                                        Make changes to your profile here. Click save when you&apos;re done.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                        Name
                                        </Label>
                                        <Input id="" type="name" className="col-span-3 border-black"/>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="email" className="text-right">
                                        Email
                                        </Label>
                                        <Input id="" className="col-span-3 border-black"/>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="contact" className="text-right">
                                        Contact Number
                                        </Label>
                                        <Input id="" className="col-span-3 border-black"/>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="age" className="text-right">
                                        Age
                                        </Label>
                                        <Input id="" type="number" className="col-span-3 border-black"/>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="job" className="text-right">
                                        Job Title
                                        </Label>
                                        <Select>
                                            <SelectTrigger className="w-full col-span-3  border-black">
                                                <SelectValue placeholder=""/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="student">Student</SelectItem>
                                                <SelectItem value="faculty">Faculty</SelectItem>
                                                <SelectItem value="intern">Student-Intern</SelectItem>  
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="course" className="text-right">
                                        Degree Program
                                        </Label>
                                        <Select>
                                            <SelectTrigger className="w-full col-span-3  border-black">
                                                <SelectValue placeholder=""/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="bsft">BSFT</SelectItem>
                                                <SelectItem value="bsb">BSB</SelectItem>
                                                <SelectItem value="msfs">MSFoodSci</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="sex" className="text-right">
                                        Sex
                                        </Label>
                                        <Select>
                                            <SelectTrigger className="w-full col-span-3  border-black">
                                                <SelectValue placeholder=""/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="male">Male</SelectItem>
                                                <SelectItem value="female">Female</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                                <SelectItem value="not">Prefer Not to Say</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="education" className="text-right">
                                        Education
                                        </Label>
                                        <Select>
                                            <SelectTrigger className="w-full col-span-3  border-black">
                                                <SelectValue placeholder=""/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="under">Undergraduate</SelectItem>
                                                <SelectItem value="post">Postgraduate</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="education" className="text-right">
                                        Research Organization
                                        </Label>
                                        <Select>
                                            <SelectTrigger className="w-full col-span-3  border-black">
                                                <SelectValue placeholder=""/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="diwa">DiWA</SelectItem>
                                                <SelectItem value="none">None</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>  
                                </div>
                                <DialogFooter>
                                    <Button className="up-primary-red" type="submit">Save changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </form>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="px-8 w-60 mt-4 up-primary-red">Reservation Prerequisite</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Update Your Profile</DialogTitle>
                                <DialogDescription className="text-justify">
                                    Make sure to update your profile before proceeding to the verification process. Click proceed when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="py-2">
                                <Link href="/verification"><Button className="up-primary-red" type="submit">Proceed</Button></Link>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md w-100 flex flex-col">
                <h1 className="text-l font-semibold text-center mt-5"> Personal Information</h1>
                <div className="mt-8 grid grid-cols-2 gapx-10 justify-items-center">
                    <p className="text-l font-semibold">Job Title</p>
                    <p className="text-l font-semibold">Age</p>
                    <p className="text-gray-600 text-sm">Student</p>
                    <p className="text-gray-600 text-sm">19</p>
                    <p className="text-l font-semibold mt-5">Degree Program</p>
                    <p className="text-l font-semibold mt-5">Sex</p>
                    <p className="text-gray-600 text-sm">BSFT</p>
                    <p className="text-gray-600 text-sm">Male</p>
                    <p className="text-l font-semibold mt-5">Education</p>
                    <p className="text-l font-semibold mt-5">Research Organization</p>
                    <p className="text-gray-600 text-sm">Undergraduate</p>
                    <p className="text-gray-600 text-sm">DiWA</p>
                </div>
                <div className="text-center mt-8">
                    <p className="text-l font-semibold">User ID</p>
                    <p className="text-gray-600">2024-0001</p>
                </div>
                <div className="flex flex-col items-center justify-center mt-6 pb-14">
                  <Link href="/incident"> <Button className="px-14 up-primary-red">Incident Report</Button> </Link>
                </div>
            </div>
        </div>
    );
};

export default profile;
