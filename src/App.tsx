import Cookie from "./component/cookie"
import Popup from "./component/popup"
import { useEffect, useState } from "react"

function App() {

  const [display, setDisplay] = useState(false)
  const [data, setData] = useState("")

  const GiveFortune = () => {
    setDisplay((prev) => !prev)
    if (data) {
      setData("")
    }
  }

  useEffect(() => {
    if (display) {
      const controller = new AbortController();
      const signal = controller.signal;

      fetch("https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand", { signal })
        .then(response => response.json())
        .then(data => {
          const randomIndex = Math.floor(Math.random() * data.length);
          setData(data[randomIndex].yoast_head_json.og_description);
        })
        .catch(error => {
          if (error.name === 'AbortError') {
            console.log('Fetch aborted');
          } else {
            console.log('Fetch error:', error);
          }
        });
      return () => controller.abort()
    }
  }, [display])


  return (
    <>
      <section id="cookie" className="flex items-center justify-center h-screen dark:bg-slate-800">
        <Cookie onClick={(GiveFortune)} />
        {display ? <Popup close={GiveFortune} description={data} /> : null}
      </section>
    </>
  )
}

export default App
