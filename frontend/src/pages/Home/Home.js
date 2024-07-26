import styles from './Home.module.scss'
import Header from '../../components/header/header'
import About from '../../components/about/about'
import Gallery from '../../components/gallery/gallery'
import Brands from '../../components/brands/brands'
import Footer from '../../components/footer/footer'
import MapMall from '../../components/map/map'

export default function Home () {
    return (
        <div className={styles.container}> 
            <Header />
            <About />
            <Gallery />
            <Brands />
            <MapMall />
            <Footer />
        </div>
    )
}