import Product from "@/components/product/Product";
import Slider from "@/components/mainSlider/MainSlider";
import sliderData from "@/components/mainSlider/MainSliderData";

export default function Home() {
  return (
    <main>
      <Slider sliderData={sliderData} />
      <Product />
    </main>
  )
}