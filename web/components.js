function TopBar(props) {
    return React.createElement(
        "div",
        { className: "top-bar" },
        React.createElement("img", { src: props.src, alt: props.alt }),
        React.createElement(
            "span",
            { className: "title" },
            props.title
        )
    );
}