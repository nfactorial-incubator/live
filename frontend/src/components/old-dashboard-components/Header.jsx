
export const Header = () => {

    return <header style={{
            display: "flex",
            justifyContent: 'space-between',
            marginBottom: 40
        }}>
        <a href=""
            style={{
                fontSize: '1.5rem',
                lineHeight: '2rem',
                display: 'inline-block',
                verticalAlign: 'middle'
            }}
        >
            <img src={process.env.PUBLIC_URL + '/assets/logo.png'} width="110px" height="42px" alt="Logo" />
        </a>
    </header>

}
