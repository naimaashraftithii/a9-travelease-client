import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const slides = [
  { id: 1, title: 'Comfortable Sedans', img: 'https://picsum.photos/1200/400?1' },
  { id: 2, title: 'Powerful SUVs', img: 'https://picsum.photos/1200/400?2' },
  { id: 3, title: 'Go Electric', img: 'https://picsum.photos/1200/400?3' },
]

export default function HeroSlider(){
  return (
    <div className="rounded-xl overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="w-full h-[260px] md:h-[360px]"
      >
        {slides.map(s => (
          <SwiperSlide key={s.id}>
            <div
              className="w-full h-full grid place-items-center text-white"
              style={{
                backgroundImage: `url(${s.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="bg-black/40 w-full h-full grid place-items-center">
                <h3 className="text-2xl md:text-3xl font-bold">{s.title}</h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
