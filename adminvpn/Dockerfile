FROM ubuntu

RUN apt update && apt install -y openssh-server sudo net-tools iputils-ping
RUN mkdir /var/run/sshd

RUN useradd -m -s $(which bash) -G sudo nomos

COPY run.sh .

EXPOSE 22
CMD ["bash", "run.sh"]
