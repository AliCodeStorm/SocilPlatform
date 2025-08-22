import React from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from '@radix-ui/react-label';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Eye, EyeOff } from "lucide-react";
import { deleteUserAccount } from '@/api/profileApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function DeleteAccount({ openDelete, setOpenDelete }) {
  const navigate = useNavigate();
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);

  const [formData, setFormData] = React.useState({
    email: '',
    newPassword: ''
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await deleteUserAccount(formData.email, formData.newPassword);
      setOpenDelete(false);
      setOpenAlert(false);
      toast.success(response.data.message || "Account deleted successfully");
      navigate("/register");
    } catch (error) {
      setOpenAlert(false);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <form onSubmit={handleSubmit}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4">
              {/* Email */}
              <div className="grid gap-3">
                <Label htmlFor="email-2">Email</Label>
                <Input
                  id="email-2"
                  name="email"
                  placeholder="Enter email"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              {/* Password */}
              <div className="grid gap-3 relative">
                <Label htmlFor="newPassword-1">Password</Label>
                <div className="relative">
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword-1"
                    name="newPassword"
                    placeholder="Enter password"
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-2 text-gray-500"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" onClick={() => setOpenDelete(false)}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" onClick={() => {setOpenAlert(true);}}>Delete</Button>
            </DialogFooter>
          </DialogContent>

          <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleSubmit}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Yes, delete my account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        </form>
      </Dialog>
    </>
  )
}
