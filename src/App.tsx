import React, { useEffect, useState } from 'react';
import './App.css';
import Topbar from "./components/Topbar/Tobar"
import Preview from "./components/OrgPreview/OrgPreview"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Org from "./components/Org/Org"
import Navbar from "./components/Navbar/Navbar"
import Door from "./components/Door/Door"
import User from "./components/User/User"
import Users from "./components/Users/Users"
import axios from 'axios';

const list = [{ name: "LRDR Immobilier", link: "organization/lrdrimmobilier" }, { name: "Manus2000", link: "organization/manus2000" }, { name: "LRDR Immobilier", link: "organization" }, { name: "LRDR Immobilier", link: "organization" }, { name: "LRDR Immobilier", link: "organization" }, { name: "LRDR Immobilier", link: "organization" }, { name: "LRDR Immobilier", link: "organization" }]
const doors = [{ name: "Door#1", hash: "1" }, { name: "Door#2", hash: "2" }, { name: "Door#3", hash: "3" }]

function App() {
  const [sections, setSections] = useState<{ id: number, name: string, org_id: number }[]>([])
  const [isloaded, setLoaded] = useState(false)
  useEffect(() => {
    if (!isloaded) {
      const res = axios.get(`http://localhost:8400/section`).then((rep) => {
        console.log(rep)
        setSections(rep.data)
        setLoaded(true)
      }).catch((err) => console.error(err))
    }

  })
  return (
    <div className="App">

      <Router>
        <Topbar />
        <div className="app-content">
          <Switch>
            <Route exact path="/">
              {sections != undefined ? sections.map((elm) => <Preview name={elm.name} link={`organization/${elm.name}`} key={elm.id} />) : <></>}
            </Route>
            <Route exact path="organization/door/:door">
              <Door />
            </Route>
            <Route exact path="/organization/:organization">
              <Org />
            </Route>
            <Route exact path="/user">
              <User />
            </Route>
            <Route exact path="/users">
              <Users />
            </Route>


          </Switch>

        </div>
      </Router>


    </div>
  );
}

export default App;
