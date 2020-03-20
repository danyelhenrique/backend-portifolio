import "./config/dotEnv";

import server from "./server";

const PORT = process.env.PORT || 3338;

server.app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
