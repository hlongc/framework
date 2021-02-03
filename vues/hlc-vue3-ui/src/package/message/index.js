import { createApp } from 'vue';
import MessageComponent from './message.vue';
import '../../style/message.scss';

const messageBox = document.createElement('div');
document.body.append(messageBox);

const style = {
  position: 'fixed',
  top: '30px',
  left: '50%',
  width: '350px',
  transform: 'translateX(-50%)',
  backgroundColor: '#fff'
};

for (const key in style) {
  messageBox.style[key] = style[key];
}

const Message = options => {
  const item = document.createElement('div');
  const app = createApp(MessageComponent, options);
  console.log(app);
  app.mount(item);
  messageBox.appendChild(item);
  setTimeout(() => {
    app.unmount();
    messageBox.removeChild(item);
  }, options.duration || 2000);
};

['success', 'error', 'warning', 'info'].forEach(type => {
  Message[type] = function(options) {
    if (typeof options === 'string') {
      options = { message: options, type };
    } else if (typeof options === 'object') {
      options.type = type;
    }
    return Message(options);
  };
});

export default Message;
