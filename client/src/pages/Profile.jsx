import LogoutButton from '@/components/authComponent/LogoutButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthProvider';
import { PencilLine, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function Profile() {
  const { user, loading } = useAuth();
  const [editField, setEditField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    UserName: user?.username || '',
    Email: user?.email || ''
  });

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

      {/* Editable fields */}
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
              <Button size="sm" onClick={() => { alert(`Saved ${field}`); setEditField(null); }}>
                Save
              </Button>
            </>
          ) : (
            <>
              <span className="flex-1">{formData[field]}</span>
              <PencilLine className="w-5 h-5 cursor-pointer text-gray-400 hover:text-gray-700"
                onClick={() => setEditField(field)} />
            </>
          )}
        </div>
      ))}

      <div>
        <h3 className="font-medium">Account Created:</h3>
        <p>{new Date(user.createdAt).toLocaleString()}</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative w-full">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="New password"
            className="w-full border px-3 py-2 rounded pr-10"
          />
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 cursor-pointer"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        </div>
        <Button onClick={() => alert('Save & Verify')}>
          Save & Verify
        </Button>
      </div>


      <div className="flex flex-col space-y-2">
        <LogoutButton />
        <Button variant="destructive" onClick={() => confirm('Delete permanently?') && alert('Deleted')}>
          Delete Account
        </Button>
      </div>
    </div>
  );
}
