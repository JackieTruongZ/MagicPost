import Image from 'next/image'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import { Button } from 'primereact/button';     

const Home = () => {
  return (
   <main>
    <div>
      <h1>hello</h1>
      <div>
        <Button>click here</Button>
      </div>
    </div>
   </main>
  )
}

export default Home;
