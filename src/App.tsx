import { useState, useEffect, useCallback } from "react";
import "./App.css";
import { GetCards } from "./services/GetCards";
import { DataType } from "./types/DataType";
import { useIntersectionObserver } from "./hooks/useIntersectionObserver";
import LoadingGif from "../public/loading.gif";

function App() {
  const [data, setData] = useState<DataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getLastElementRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      setTarget(node);
    }
  }, []);

  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  };
  const { setTarget } = useIntersectionObserver((entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setIsLoading(true);
        GetCards(50, 50).then((newData) => {
          setData(prev => prev.concat(newData))
          setIsLoading(false);
        });
      }
    })
  }, options);

  useEffect(() => {
    setIsLoading(true);
    GetCards(50, 50).then((data) => {
      setData(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
    <header>
      <h1 style={{textAlign: "center"}}>CARDS</h1>
    </header>
      <div>
        <div className="flex-grid">
          {data.map(({ id, sn, index }, mapIdx) => (
            <div
              key={id}
              id={id.toString()}
              style={{ border: "1px solid black", backgroundColor: mapIdx == data.length - 1 ? "red" : undefined}}
              ref={mapIdx == data.length - 1 ? getLastElementRef : undefined}
            >
              <div>ID: {id}</div>
              <div>SN: {sn}</div>
              <div>IDX: {index}</div>
            </div>
          ))}
        </div>
      </div>
      {
        isLoading && (
          <div style={{margin: "5px auto", display: "flex", justifyContent: "center"}}>
            <img width={50} src={LoadingGif} />
          </div>
        )
      }
    </>
  );
}

export default App;
