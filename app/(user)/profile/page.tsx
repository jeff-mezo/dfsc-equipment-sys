"use client"
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
import useUser from '@/app/hook/useUser'
import { useQueryClient } from '@tanstack/react-query'
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { updateProfile } from "./actions"
import { toast } from "@/components/ui/use-toast"

export type ProfileForm = {
    //   id: string
    name: string;
    email: string;
    contactno: string;
    age: string;
    jobTitle: string;
    degprog: string;
    sex: string;
    education: string;
    organization: string;
}

type ProfileFormState = {
    formData: ProfileForm
    loading: boolean
    error: string | null
    success: boolean
}



const profile = () => {
    const { isFetching, data } = useUser();
    const queryClient = useQueryClient();

    console.log(data?.name)
    // ============ PROFILE UPDATE: ================
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNum, setContactNum] = useState('');
    const [age, setAge] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [degree, setDegree] = useState('');
    const [sex, setSex] = useState('');
    const [educ, setEduc] = useState('');
    const [researchOrg, setResearchOrg] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    useEffect(() => {
        if(data) {
            // if (!data) throw new Error('No user logged in');
            // if (error) throw error;
            console.log('setting...')
            setName((data?.name) ? data.name : '-');
            setEmail((data?.email) ? data.email : '');
            setContactNum((data?.contactno) ? data.contactno : '-');
            setAge((data?.age) ? data.age : '');
            setJobTitle((data?.jobtitle) ? data.jobtitle : 'faculty');
            setDegree((data?.degprog) ? data.degprog : '');
            setSex((data?.sex) ? data.sex : '');
            setEduc((data?.education) ? data.education : '');
            setResearchOrg((data?.organization) ? data.organization : '');
        } else if(error) {
            setError(error);
        }
    }, [data]);


    const handleSubmit = async () => {
        console.log("submitting...")

        const update = {
            //   id: string
            name,
            email,
            contactno: contactNum,
            age,
            jobtitle: jobTitle,
            sex,
            degprog: degree,
            education: educ,
            organization: researchOrg,
            updated_at: new Date(),
        }
    
        const result = await updateProfile(data?.id, update);
        const { error, data: todo } = JSON.parse(result);

        if (error?.message) {
            console.log(error.message)
            toast({
                variant: "destructive",
                title: "Fail to update profile",
                description: (
                    <pre className="mt-2 w-[640px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{error.message}</code>
                    </pre>
                ),
            });
        } else {
            toast({
                title: "Successfully updated profile.",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">
                            {email} profile updated!
                        </code>
                    </pre>
                ),
            });
        }

        setIsDialogOpen(false);
    }

    // const handleUpdateProfile = async () => {
    //     setLoading(true);
    //     setError(null);
    
    //     try {
    //       const user = supabase.auth.user();
    //       if (!user) throw new Error('No user logged in');
    
    //       const updates = {
    //         name,
    //         email,
    //         full_name: fullName,
    //         avatar_url: avatarUrl,
    //         role, // Include the selected role
    //         updated_at: new Date(), // you might want to track when the profile was updated
    //       };
    
    //       const { data, error } = await supabase
    //         .from('profiles')
    //         .update(updates)
    //         .eq('id', user.id);
    
    //       if (error) throw error;
    //       alert('Profile updated successfully');
    //     } catch (error: any) {
    //       setError(error.message);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };



    return (
        <div className="bg-gray-100 min-h-screen flex flex-col sm:flex-row justify-center items-center gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md w-96 flex flex-col">
                <div className="flex flex-col items-center">
                    <Avatar className="w-24 h-24 rounded-full mx-auto mb-2">
                        <AvatarImage src={(data?.profileimg) ? data?.profileimg : "https://hwchamber.co.uk/wp-content/uploads/2022/04/avatar-placeholder.gif"}/>
                    </Avatar>
                    <Badge className="mb-4 up-primary-red">{(data?.isVerified) ? "Unverified" : "Verified" }</Badge>
                </div>
                <div className="text-center mt-4">
                    <h1 className="text-l font-semibold">{(data?.name) ? data.name : "-"}</h1>
                    <p className="text-gray-600 text-sm">Name</p>
                    <p className="text-l font-semibold mt-4">{(data?.email) ? data.email : "-"}</p>
                    <p className="text-gray-600 text-sm">Email</p>
                    <p className="font-semibold mt-4">{(data?.contactno) ? data.contactno : "-"}</p>
                    <p className="text-gray-600 text-sm">Contact Number</p>
                </div>
                <div className="flex flex-col items-center justify-center mt-8">
                    
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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

                                <form 
                                    onSubmit={(e) => {
                                        console.log("update initialization..")
                                        e.preventDefault();
                                        handleSubmit();
                                    }}
                                >
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                        Name
                                        </Label>
                                        <Input id="" className="col-span-3 border-black" 
                                            name="name"
                                            type="text"
                                            value={name}
                                            onChange={(e) => { const regex = /^[a-zA-Z.\- ]*$/; 
                                            if (regex.test(e.target.value)) {
                                                setName(e.target.value); 
                                            }
                                        }}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="email" className="text-right">
                                        Email
                                        </Label>
                                        <Input id="" className="col-span-3 border-black" 
                                            name="email"
                                            type="text"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}    
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="contact" className="text-right">
                                        Contact Number
                                        </Label>
                                        <Input id="" className="col-span-3 border-black" 
                                            name="contactNum"
                                            type="text"
                                            value={contactNum}
                                            onChange={(e) => {
                                                const regex = /^[0-9\-]*$/; 
                                                if (regex.test(e.target.value)) {
                                                    setContactNum(e.target.value); 
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="age" className="text-right">
                                        Age
                                        </Label>
                                        <Input id="" type="text" className="col-span-3 border-black"
                                            name="age"
                                            value={age}
                                            onChange={(e) => {
                                                const regex = /^[0-9\-]*$/; 
                                                if (regex.test(e.target.value)) {
                                                    setAge(e.target.value); 
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="job" className="text-right">
                                        Job Title
                                        </Label>
                                        <Select
                                            name="jobTitle"
                                            value={jobTitle}
                                            onValueChange={(e) => { setJobTitle(e); console.log("job: ", jobTitle, "e: ", e)} }
                                        >
                                            <SelectTrigger className="w-full col-span-3  border-black">
                                                <SelectValue placeholder="-" aria-label={jobTitle}> 
                                                    {jobTitle}
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Student">Student</SelectItem>
                                                <SelectItem value="Faculty">Faculty</SelectItem>
                                                <SelectItem value="Student-Intern">Student-Intern</SelectItem>  
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="course" className="text-right">
                                        Degree Program
                                        </Label>
                                        <Select
                                            name="degree"
                                            value={degree}
                                            onValueChange={(e) => setDegree(e)}
                                        >
                                            <SelectTrigger className="w-full col-span-3  border-black">
                                                <SelectValue placeholder="-" aria-label={degree}> 
                                                    {degree}
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="BSFT">BSFT</SelectItem>
                                                <SelectItem value="BSB">BSB</SelectItem>
                                                <SelectItem value="MSFoodSci">MSFoodSci</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="sex" className="text-right">
                                        Sex
                                        </Label>
                                        <Select
                                            name="sex"
                                            value={sex}
                                            onValueChange={(e) => setSex(e)}
                                        >
                                            <SelectTrigger className="w-full col-span-3  border-black">
                                                <SelectValue placeholder="-" aria-label={sex}> 
                                                    {sex}
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Male">Male</SelectItem>
                                                <SelectItem value="Female">Female</SelectItem>
                                                <SelectItem value="Other">Other</SelectItem>
                                                <SelectItem value="Prefer Not to Say">Prefer Not to Say</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="education" className="text-right">
                                        Education
                                        </Label>
                                        <Select
                                            name="education"
                                            value={educ}
                                            onValueChange={(e) => setEduc(e)}
                                        >
                                            <SelectTrigger className="w-full col-span-3  border-black">
                                                <SelectValue placeholder="-" aria-label={educ}> 
                                                    {educ}
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                                                <SelectItem value="Postgraduate">Postgraduate</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="education" className="text-right">
                                        Research Organization
                                        </Label>
                                        <Select
                                            name="researchOrg"
                                            value={researchOrg}
                                            onValueChange={(e) => setResearchOrg(e)}
                                        >
                                            <SelectTrigger className="w-full col-span-3  border-black">
                                                <SelectValue placeholder="-" aria-label={researchOrg}> 
                                                    {researchOrg}
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="DiWA">DiWA</SelectItem>
                                                <SelectItem value="None">None</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>  
                                </div>
                                <DialogFooter>
                                    <Button className="up-primary-red" type="submit">Save changes</Button>
                                </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="px-8 w-60 mt-4 up-primary-red">Reservation Prerequisite</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Update Your Profile</DialogTitle>
                                <DialogDescription className="text-justify">
                                    Make sure to update your profile before proceeding to the verification process. Click proceed when you&apos;re done.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="py-2">
                                <Link href="/verification"><Button className="up-primary-red">Proceed</Button></Link>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md w-100 flex flex-col">
                <h1 className="text-2xl font-semibold text-center mt-5"> Personal Information</h1>
                <div className="mt-8 grid grid-cols-2 gapx-10 justify-items-center">
                    <p className="text-l font-semibold">Job Title</p>
                    <p className="text-l font-semibold">Age</p>
                    <p className="text-gray-600 text-sm">{(data?.jobtitle) ? data.jobtitle : "-"}</p>
                    <p className="text-gray-600 text-sm">{(data?.age) ? data.age : "-"}</p>
                    <p className="text-l font-semibold mt-5">Degree Program</p>
                    <p className="text-l font-semibold mt-5">Sex</p>
                    <p className="text-gray-600 text-sm">{(data?.degprog) ? data.degprog : "-"}</p>
                    <p className="text-gray-600 text-sm">{(data?.sex) ? data.sex : "-"}</p>
                    <p className="text-l font-semibold mt-5">Education</p>
                    <p className="text-l font-semibold mt-5">Research Organization</p>
                    <p className="text-gray-600 text-sm">{(data?.education) ? data.education : "-"}</p>
                    <p className="text-gray-600 text-sm">{(data?.organization) ? data.organization : "-"}</p>
                </div>
                <div className="text-center mt-8">
                    <p className="text-l font-semibold">User ID</p>
                    <p className="text-gray-600">{data?.id?.substring(0, 12)}...</p>
                </div>
                <div className="flex flex-col items-center justify-center mt-4">
                  <Link href="/incident"> <Button className="px-8 w-60 up-primary-red">Incident Report</Button> </Link>
                </div>
                <div className="flex flex-col items-center justify-center mt-4">
                  <Link href="/viewPDF"> <Button className="px-8 w-60 up-primary-red">View Your Files</Button> </Link>
                </div>
            </div>
        </div>
    );
};
export default profile;
