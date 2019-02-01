docker swarm init

NODE_HOST=$(docker node inspect self | grep Hostname | grep -oEi '[a-z]+' | tail -n 1)

STORAGE_NODE_MASTER=$NODE_HOST
STORAGE_NODE_REPLICA=$NODE_HOST

docker node ls

# specify master storage node, this is the node which will have master database affinity
docker node update --label-add nomos.persistence.master=storage $STORAGE_NODE_MASTER
# this path is required on the master node
mkdir -p /srv/nomos/storage/master

# specify replica storage node, this is the node which will have replica database affinity
docker node update --label-add nomos.persistence.replica=storage $STORAGE_NODE_REPLICA
# this path is required on the replica node
mkdir -p /srv/nomos/storage/replica

docker network inspect proxy || docker network create --driver overlay proxy
docker network inspect admin || docker network create --driver overlay admin
