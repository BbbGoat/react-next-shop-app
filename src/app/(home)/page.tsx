import Slider from "@/components/slider/Slider";
import MainSlider from "@/components/slider/mainSlider/MainSlider";
import sliderData from "@/components/slider/mainSlider/MainSliderData";

export default function Home() {
  return (
    <main>
      <MainSlider sliderData={sliderData} />
      <Slider />
    </main>
  )
}