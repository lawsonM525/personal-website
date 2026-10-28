import Image from "next/image"
import styles from "./home.module.css"

export function ProfileMark() {
  return <span className={styles.profileMark} aria-hidden="true"><Image src="/begin/michelle-photos/michelle-yellow-sweater-portrait.jpeg" alt="" width={68} height={68} sizes="68px" priority /></span>
}
