let Base_URL = ""
let TIME_OUT = 5 * 1000

switch (process.env.NODE_ENV) {
	case "development":
		Base_URL = "123.207.32.32:8000"
		break
	case "test":
		break
	case "product":
		break
	default:
		break
}

export { Base_URL, TIME_OUT }
