sudo docker node ls

# specify master storage node, this is the node which will have master database affinity
sudo docker node update --label-add nomos.persistence.master=storage $STORAGE_NODE_MASTER
# this path is required on the master node
sudo mkdir /srv/nomos/storage/master

# specify replica storage node, this is the node which will have replica database affinity
sudo docker node update --label-add nomos.persistence.replica=storage $STORAGE_NODE_REPLICA
# this path is required on the replica node
sudo mkdir /srv/nomos/storage/replica

sudo docker network inspect proxy || sudo docker network create --driver overlay proxy
sudo docker network inspect admin || sudo docker network create --driver overlay admin
