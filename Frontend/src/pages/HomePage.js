import { useState, useEffect, useContext } from "react"
import VinylAPI from "../api/VinylAPI"
import VinylList from "../components/VinylList/VinylList"
import UserContext from "../contexts/UserContext"

const HomePage = (props) => {
  console.log(props.user);
    // states
    // const [vinyls, setVinyls] = useState([])
    // // const user = useContext(UserContext).user;

    // // effects
    // useEffect(() => {
    //   const getVinyls = async () => {
    //       const data = await VinylAPI.fetchVinyls(props.user.email)
    //       if (data) {
    //         setVinyls(data[0].vinyls)
    //         console.log(props.user)
    //     }
    //   }
  
    //   getVinyls()
    // }, [props.user.email])
  
    // render
    return (
      <div>
        <h2>Home Page</h2>
        <hr />
      </div>
    )
}

export default HomePage