import styled from "styled-components";
// import colors from "@/app/global/styles/colors";
import sizes from "@/app/global/styles/sizes";

const {small} = sizes

const Message = styled.div`
    color: black;
    font-size: ${small};
    padding: 8px 10px 8px 11px;
`

const Messages = ({ children, color }) => {
    if (children) return <></>

    // 배열이 아닐 경우 배열로 감싸줌
  let messages = Array.isArray(children) ? children : [children]

  // 배열일 경우
  messages = messages.filter((s) => s && ('' + s)?.trim())

  // 값이 없을 경우
  if (messages.length === 0) return <></>

  console.log('messages', messages)

  return messages.map((message, i) => (
    <Message key={message + '_' + i} color={color}>
      {message}
    </Message>
  ))


}

export default Messages