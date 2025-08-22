import LogoutButton from '@/components/authComponent/LogoutButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthProvider';
import { PencilLine} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { updateEmail, updateUserName } from '@/api/profileApi';
import { PasswordChangeDialog } from '@/components/authComponent/PassowrdChangeDialoge';
import DeleteAccount from '@/components/authComponent/DeleteAccount';

export default function Profile() {
  const { user, loading } = useAuth();
  const [editField, setEditField] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [open, setOpen] = useState(false);

  const handleUpdateEmail = async () => {
    try {
      const res = await updateEmail(formData.Email);
      toast.success(res.data.message || "Email updated successfully");
      setEditField(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  const [formData, setFormData] = useState({
    UserName: user?.username || '',
    Email: user?.email || ''
  });

  const handleUpdateUsername = async () => {
    try {
      const res = await updateUserName(formData.UserName);
      toast.success(res.data.message || "Username updated successfully");
      setEditField(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  if (loading) return <p>Loading...</p>;

  return (
    <div className="mt-10 space-y-6 border-gray-900 max-w-md mx-auto p-6 bg-white rounded-xl shadow-inner ring-1 ring-gray-300">
      <div className="flex flex-col items-center space-y-2">
        <Avatar className="w-20 h-20">
          <AvatarImage src={user?.avatarUrl} alt={user?.name} />
          <AvatarFallback>{user?.name[0]}</AvatarFallback>
        </Avatar>
        <h2 className="text-2xl font-semibold">{user.name}</h2>
      </div>

      {['UserName', 'Email'].map(field => (
        <div key={field} className="flex items-center">
          <label className="w-24 font-medium">{field}:</label>
          {editField === field ? (
            <>
              <input
                name={field}
                value={formData[field]}
                onChange={e => setFormData({ ...formData, [field]: e.target.value })}
                className="flex-1 border px-2 py-1 rounded"
              />
              <Button
                size="sm"
                onClick={() => {
                  field === "Email" ? handleUpdateEmail() : handleUpdateUsername();
                }}
              >
                Save
              </Button>
            </>
          ) : (
            <>
              <span className="flex-1">{formData[field]}</span>
              <PencilLine
                className="w-5 h-5 cursor-pointer text-gray-400 hover:text-gray-700"
                onClick={() => setEditField(field)}
              />
            </>
          )}
        </div>
      ))}

      <div>
        <h3 className="font-medium">Account Created:</h3>
        <p>{new Date(user.createdAt).toLocaleString()}</p>
      </div>

      <div className="flex items-center mt-4">
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
          className="w-full"
        >
          Change Password
        </Button>
        <PasswordChangeDialog open={open} setOpen={setOpen} />
      </div>

      <div className="flex flex-col space-y-2">
        <LogoutButton />
        <Button variant="destructive" onClick={() => setOpenDelete(true)}>
          Delete Account
        </Button>
        <DeleteAccount openDelete={openDelete} setOpenDelete={setOpenDelete}/>
      </div>
    </div>
  );
}
