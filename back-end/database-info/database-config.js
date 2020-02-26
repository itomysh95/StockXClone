const poolInfo = {
    user: 'node_user',
    host: 'localhost',
    database: 'sneakerdb',
    password: 'node_password',
    port:5432
}

const cloudInfo = {
    url: "postgres://qsjniwmk:Cn75s1IipX9zrgzESFL5k2wwHRIjRSTQ@rajje.db.elephantsql.com:5432/qsjniwmk"
}

module.exports = {
    poolInfo: poolInfo,
    cloudInfo: cloudInfo
}