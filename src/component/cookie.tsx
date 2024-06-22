import Image from "../res/Fortune_cookie.png"


type CookieProps = {
    onClick: () => | void
}


export default function Cookie({ onClick }: CookieProps) {
    return (
        <button onClick={onClick}>
            <img src={Image} className="cookie" ></img>
        </button >
    )
}

