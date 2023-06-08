import Styles from "./404.module.css";


//zeigt 404 an wenn keine Seite gefunden wurde
export default function Page404(){
    return <div className="vstack" id={Styles.root}>
        <div className="vstack">
        <span id={Styles.faild}>404</span>
        <span style={{margin:"auto"}}>Page not found</span>
        </div>
    </div>
}