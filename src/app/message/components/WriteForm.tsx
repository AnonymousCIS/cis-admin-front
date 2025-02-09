import { Input } from "@/app/global/components/FormComponents";
import React from "react";
import styled from "styled-components";
import { SmallButton } from "@/app/global/components/Buttons";

const StyledForm = styled.form``

const Entity = styled.div`
    padding: 10px;
`

const Container = styled.div`
    display: inline-block;
    margin: 4px 0;
`

const WriteForm = () => {

    return (
        <>
            <StyledForm>
                <SmallButton style={{width: 60, display: "block", margin: '10px'}}>보내기</SmallButton>
                <Container>
                    <Entity>받는 사람 이메일</Entity>
                    <div>
                        <Input type="text" name="email" color="dark" />
                    </div>
                </Container>
                <Container>
                    <Entity>제목</Entity>
                    <div className="notice">

                    </div>
                    <dd>
                        <Input type="text" name="subject" color="dark" />
                    </dd>
                </Container>
                <Container>
                    <Entity>내용</Entity>
                    <dd>
                        <Input type="text" name="content" color="dark" />
                    </dd>
                </Container>
            </StyledForm>
        </>
    )
}

export default React.memo(WriteForm)