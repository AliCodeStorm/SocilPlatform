import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updatePassword } from "@/api/profileApi";
import { toast } from "sonner";

export function PasswordChangeDialog({ open, setOpen }) {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        oldPassword: "",
        newPassword: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await updatePassword(formData.email, formData.oldPassword, formData.newPassword);
            toast.success(res.data.message || "Password updated successfully");
            setOpen(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
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
                            <Label htmlFor="email-1">Email</Label>
                            <Input
                                id="email-1"
                                name="email"
                                placeholder="Enter email"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        {/* Old Password */}
                        <div className="grid gap-3 relative">
                            <Label htmlFor="oldPassword-1">Old Password</Label>
                            <div className="relative">
                                <Input
                                    type={showOldPassword ? "text" : "password"}
                                    id="oldPassword-1"
                                    name="oldPassword"
                                    placeholder="Enter old password"
                                    onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                                />
                                <button
                                    type="button"
                                    className="absolute right-2 top-2 text-gray-500"
                                    onClick={() => setShowOldPassword(!showOldPassword)}
                                >
                                    {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div className="grid gap-3 relative">
                            <Label htmlFor="newPassword-1">New Password</Label>
                            <div className="relative">
                                <Input
                                    type={showNewPassword ? "text" : "password"}
                                    id="newPassword-1"
                                    name="newPassword"
                                    placeholder="Enter new password"
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
                            <Button variant="outline" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" onClick={handleSubmit}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
