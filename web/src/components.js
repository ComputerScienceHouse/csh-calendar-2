function TopBar(props) {
    return (
        <div className="top-bar shadow">
            <img src={props.src} alt={props.alt}></img>
            <span className="title">{props.title}</span>
        </div>
    );
}