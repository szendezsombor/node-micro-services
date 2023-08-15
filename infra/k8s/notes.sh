#Az _ vonással jelölt fájlok régiek, nem kell a projekt futtatásához.

alias k = kubectl

# Deployment indítás
k apply -f event-bus-depl.yaml
k apply -f posts-depl.yaml
k apply -f comments-depl.yaml
k apply -f moderation-depl.yaml
k apply -f query-depl.yaml

# Az összes fájl applyolása a . folderben
k apply -f .

# Deploymentek lekérése
k get deploy

# Deploymentek leírásának listázása
k describe deploy posts-depl

# Nodeport indítás lokális teszteléshez
k create -f posts-srv.yaml

# Rollout:
k rollout restart deploy posts-depl
k rollout restart deploy event-bus-depl
k rollout restart deploy comments-depl-depl
k rollout restart deploy moderation-depl-depl
k rollout restart deploy query-depl-depl

# Podok lekérése
k get po

# Logok kiszedése a podból
k logs posts-depl-6f7999bcd9-xnpvx

# Pod container megnyitása
k exec -it posts-depl-6f7999bcd9-xnpvx sh