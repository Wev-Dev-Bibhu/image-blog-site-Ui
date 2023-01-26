export const formStyle = {
    background: '#112132',
    width: '30%',
    // height: 800,
    padding: '20px 30px',
    borderRadius: 3,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    color: '#adb2b7',
    // eslint-disable-next-line
    ['@media (max-width: 740px)']: {
        flexDirection: 'column',
        width: "70%",
        marginTop: 15
    }
}

export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};