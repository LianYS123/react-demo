export const CLIENT_CYCLE_TYPES = {
  潜客: {
    title: "潜客",
    desc: "注册未消费",
    primaryColor: '#4F8DFF',
    num: 10,
  },
  新客: {
    title: "新客",
    desc: "累计消费<5次",
    primaryColor: '#00DCA2',
    num: 10,
  },
  老客: {
    title: "老客",
    desc: "累计消费>5次\n最近30天<10次",
    primaryColor: '#48CAF0',
    num: 10,
  },
  粉丝: {
    title: "粉丝",
    desc: "累计消费>5次\n最近30天>10次",
    primaryColor: '#FFBC00',
    num: 10,
  },
  召回客: {
    title: "召回客",
    desc: "召回后累计消费<5次",
    primaryColor: '#F95E3E',
    num: 10,
  },
  休眠客: {
    title: "休眠客",
    desc: "14<未消费次数<30",
    primaryColor: '#597095',
    num: 10,
  },
  高价值流失: {
    title: "高价值流失",
    desc: "未消费天数>30\n累计消费次数>30",
    primaryColor: '#996BD0',
    num: 10,
  },
  低价值流失: {
    title: "低价值流失",
    desc: "累计消费次数<30",
    primaryColor: '#FF9834',
    num: 10,
  },
};
