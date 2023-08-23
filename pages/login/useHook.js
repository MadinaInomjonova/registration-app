import { useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"

export const useHook = () => {
  const router = useRouter()
  const [form, setForm] = useState({
    username: "",
    password: ""
  })
  const [msg, setMsg] = useState("")

  const handleChange = (e) => {
    const copyForm = { ...form };
    copyForm[e.target.name] = e.target.value;
    setForm(copyForm)
  }

  const handleLogin = () => {
    axios.post("/api/login", {
      username: form.username, password: form.password
    }
    ).then((response) => {
      if (response.status === 204) {
        setMsg("No User found with this username")
      } else if (response.status === 201) {
        setMsg("Password is incorrect")
      } else {
        localStorage.setItem("accessToken", response.data.accessToken)
        router.push("../")
        setMsg("")
      }
    }).catch((err) => {console.log(err)})
  }

  return { form, handleLogin, handleChange, msg }
}
