// HR - this function is used to update state on input change
// we send setState function and the target to update the key:value pairs in state objects
export default function handleInputChange(target, setData) {
    setData((data) => ({...data, [target.name]: target.value}))
}