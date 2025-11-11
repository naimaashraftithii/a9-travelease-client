import http from './http'
export const createBooking = (data) => http.post('/api/bookings', data).then(r=>r.data)
export const myBookings    = ()      => http.get('/api/bookings/my').then(r=>r.data)
