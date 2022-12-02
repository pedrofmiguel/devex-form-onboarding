import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout';

const Home: NextPage = () => {
  return (
    <Layout styles={styles}>
      <div className={styles.grid}>
        <a href="/FormPage" className={styles.card}>
          <h2>Form Page &rarr;</h2>
          <p>Onboarding form task using monads.</p>
        </a>
        <a href="/FileChecker" className={styles.card}>
          <h2>File Checker Page &rarr;</h2>
          <p>app to check file lines</p>
        </a>
      </div>
    </Layout>
  )
}

export default Home
