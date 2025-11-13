import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchVehicle, updateVehicle } from '../api/vehicles';
import toast from 'react-hot-toast';

export default function UpdateVehicle() {
  const { id } = useParams();
  const nav = useNavigate();
  const qc = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['vehicle', id],
    queryFn: () => fetchVehicle(id),
  });

  const [form, setForm] = useState({
    vehicleName: '', owner: '', category: 'Sedan', pricePerDay: '',
    location: '', availability: 'Available', description: '', coverImage: '',
  });

  useEffect(() => {
    if (data) {
      setForm({
        vehicleName: data.vehicleName || '',
        owner: data.owner || '',
        category: data.category || 'Sedan',
        pricePerDay: data.pricePerDay ?? '',
        location: data.location || '',
        availability: data.availability || 'Available',
        description: data.description || '',
        coverImage: data.coverImage || '',
      });
    }
  }, [data]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload) => updateVehicle(id, payload),
    onSuccess: () => {
      toast.success('Vehicle updated');
      qc.invalidateQueries({ queryKey: ['vehicle', id] });
      qc.invalidateQueries({ queryKey: ['vehicles'] });
      qc.invalidateQueries({ queryKey: ['myVehicles'] });
      nav('/my-vehicles');
    },
    onError: (e) => toast.error(e.message),
  });

  const onChange = (k, v) => setForm(s => ({ ...s, [k]: v }));
  const onSubmit = async (e) => {
    e.preventDefault();
    await mutateAsync({ ...form, pricePerDay: Number(form.pricePerDay) || 0 });
  };

  if (isLoading) return <div className="py-10 text-center">Loading…</div>;
  if (error) return <div className="py-10 text-center">Failed to load vehicle.</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Update Vehicle</h1>
      <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4">
        <input className="input input-bordered" placeholder="Vehicle Name"
               value={form.vehicleName} onChange={e=>onChange('vehicleName', e.target.value)} />
        <input className="input input-bordered" placeholder="Owner Name"
               value={form.owner} onChange={e=>onChange('owner', e.target.value)} />
        <select className="select select-bordered"
                value={form.category} onChange={e=>onChange('category', e.target.value)}>
          <option>Sedan</option><option>SUV</option><option>Electric</option><option>Van</option>
        </select>
        <input className="input input-bordered" placeholder="Price Per Day"
               value={form.pricePerDay} onChange={e=>onChange('pricePerDay', e.target.value)} />
        <input className="input input-bordered" placeholder="Location"
               value={form.location} onChange={e=>onChange('location', e.target.value)} />
        <select className="select select-bordered"
                value={form.availability} onChange={e=>onChange('availability', e.target.value)}>
          <option>Available</option><option>Booked</option>
        </select>
        <input className="input input-bordered md:col-span-2" placeholder="Cover Image URL"
               value={form.coverImage} onChange={e=>onChange('coverImage', e.target.value)} />
        <textarea className="textarea textarea-bordered md:col-span-2" placeholder="Description"
                  value={form.description} onChange={e=>onChange('description', e.target.value)} />
        <div className="md:col-span-2 flex gap-3">
          <button className="btn btn-primary" disabled={isPending}>Save Changes</button>
          <button type="button" className="btn" onClick={()=>nav(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
