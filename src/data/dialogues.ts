export interface DialogueLine {
  start: number;
  end: number;
  speaker: 'girl' | 'boy1' | 'boy2' | 'all';
  text: string;
}

export const STORY_DIALOGUES: DialogueLine[] = [
  {
    start: 5.6,
    end: 7.9,
    speaker: 'girl',
    text: 'Oa! Cây xoài sai trĩu quả kìa anh ơi! 😍',
  },
  {
    start: 8.1,
    end: 10.3,
    speaker: 'boy1',
    text: 'Mau đem đĩa muối tôm ra đây, tao chọc liền!',
  },
  {
    start: 10.6,
    end: 12.3,
    speaker: 'girl',
    text: 'Đĩa đây đĩa đây! Đổ đậm muối ớt vô nha! 🌶️',
  },
  {
    start: 12.0,
    end: 13.9,
    speaker: 'boy1',
    text: 'Muối tôm Tây Ninh cay xé lưỡi luôn nè!',
  },
  {
    start: 14.2,
    end: 16.0,
    speaker: 'boy1',
    text: 'Ủa mà... cái sào tre đâu mất tiêu rồi?! 🤔',
  },
  {
    start: 16.3,
    end: 17.9,
    speaker: 'boy1',
    text: 'A thấy rồi! Dựa ngay góc rào tre nè! 🎋',
  },
  {
    start: 18.8,
    end: 20.8,
    speaker: 'boy1',
    text: 'Nhắm quả bự nhất trước... HÂY!! 🎯',
  },
  {
    start: 21.0,
    end: 22.8,
    speaker: 'girl',
    text: 'Chọc trượt rồi kìa ông tướng ơi! 🤣',
  },
  {
    start: 23.2,
    end: 24.9,
    speaker: 'boy1',
    text: 'Gió to quá xoài nó lắc như khiêu vũ á! 💦',
  },
  {
    start: 25.3,
    end: 26.9,
    speaker: 'boy2',
    text: 'Tránh ra! Để siêu nhân chọc cho! 😎',
  },
  {
    start: 27.1,
    end: 28.5,
    speaker: 'boy2',
    text: 'Đứng yên nào... Ủa lại hụt nữa?! 😵',
  },
  {
    start: 28.6,
    end: 29.8,
    speaker: 'girl',
    text: 'Ha ha ha! Tưởng siêu nhân thế nào! 😆',
  },
  {
    start: 30.0,
    end: 31.7,
    speaker: 'boy2',
    text: 'Đừng cười! Gồng tụ lực bí truyền... XOAY SÀO LẤY ĐÀ!! 🔥',
  },
  {
    start: 31.8,
    end: 32.8,
    speaker: 'boy2',
    text: 'Bách phát bách trúng... PHI CÂY!! ⚡',
  },
  {
    start: 33.6,
    end: 36.8,
    speaker: 'all',
    text: 'RÚNG RỒI! CHẤM MUỐI ĂN THÔI CÁC BẠN ƠI!! 🥭🎉',
  },
];
