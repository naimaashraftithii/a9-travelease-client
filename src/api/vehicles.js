import http from './http'
export const fetchVehicles = (params) => http.get('/api/vehicles', { params }).then(r=>r.data)
export const fetchVehicle  = (id)     => http.get(`/api/vehicles/${id}`).then(r=>r.data)
export const createVehicle = (data)   => http.post('/api/vehicles', data).then(r=>r.data)
export const updateVehicle = (id,d)   => http.put(`/api/vehicles/${id}`, d).then(r=>r.data)
export const deleteVehicle = (id)     => http.delete(`/api/vehicles/${id}`).then(r=>r.data)
