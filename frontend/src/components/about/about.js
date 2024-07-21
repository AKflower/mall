import styles from './about.module.scss'

export default function About () {
    return (
        <div className={styles.container}>
            <div className={styles.introduction}>
                <h1>ABCD MALL</h1>
                <p>Chào mừng đến với Trung tâm Thương mại ABCD - viên ngọc quý của ngoại ô Mumbai. Được kiến tạo bởi ABCD Developers, trung tâm trải rộng trên diện tích 23.000 mét vuông với mặt tiền lộng lẫy dài 210 mét, một biểu tượng của thiết kế đương đại bởi các kiến trúc sư tài hoa từ Cooper và đồng nghiệp.</p>
            </div>
            <div className={styles.establish}>
                <h1>2017</h1>
                <p>Năm thành lập</p>
            </div>
        </div>
    )
}