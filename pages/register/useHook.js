import { useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"

export const useHook = () => {
  const router = useRouter()
  const [form, setForm] = useState({
    username: "",
    password: "",
    password2: ""
  })
  const [msg, setMsg] = useState("")

  const handleChange = (e) => {
    const copyForm = { ...form };
    copyForm[e.target.name] = e.target.value;
    setForm(copyForm)
  }

  const handleRegister = () => {
    axios.post("/api/register", {
      username: form.username, password: form.password, password2: form.password2
    }
    ).then((response) => {
      router.push("../login/")
    }).catch((err) => {
      setMsg(err.response.data.message)
    })
  }

  return { form, handleRegister, handleChange, msg }
}
