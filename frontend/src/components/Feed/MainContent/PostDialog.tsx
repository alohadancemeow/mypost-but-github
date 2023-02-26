import React, { useState } from "react";
import styled from "styled-components";
import {
  Box,
  IssueLabelToken,
  StyledOcticon,
  Text,
  Textarea,
  TextInput,
  TextInputWithTokens,
} from "@primer/react";
import { Dialog } from "@primer/react/drafts";
import {
  BookIcon,
  HashIcon,
  PencilIcon,
  RocketIcon,
} from "@primer/octicons-react";

import { PostInput, tokens } from "../../../../types/myTypes";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onCreatePost: (post: PostInput) => Promise<void>;
};

const PostDialog = ({ isOpen, setIsOpen, onCreatePost }: Props) => {
  const [postInput, setPostInput] = useState<PostInput>({
    title: "",
    body: "",
    tags: [],
  });

  //   console.log("postInput", postInput);

  const closeDialog = () => setIsOpen(false);

  // handle remove token -> tags
  const onTokenRemove = (tokenId: any) => {
    setPostInput({
      ...postInput,
      tags:
        postInput.tags && postInput.tags.filter((tag) => tag.id !== tokenId),
    });
  };

  // handle add token -> tags
  const onTokenAdd = (token: { text: string; id: number }) => {
    if (!postInput.tags.some((t) => t.id === token.id)) {
      setPostInput({
        ...postInput,
        tags: [...postInput.tags, { ...token }],
      });
    }
  };

  // Handle onSubmit -> create post
  const onSubmit = async () => {
    if (!postInput.title || !postInput.body || postInput.tags.length === 0)
      return;
    return await onCreatePost(postInput);
  };

  return (
    <Box>
      {isOpen && (
        <Dialog
          sx={{ bg: "#373E47", color: "white" }}
          title={<Text as="h2">Create your post</Text>}
          onClose={closeDialog}
        >
          <>
            <MyBox>
              <Box>
                <PencilIcon size={24} />
              </Box>
              <TextInput
                contrast
                aria-label="text"
                placeholder="Enter post title"
                type="text"
                sx={{
                  bg: "transparent",
                  border: "1px solid #444C56",
                  width: "100%",
                  height: "40px",
                  borderRadius: "3px",
                  marginInlineStart: "15px",
                }}
                onChange={(e) =>
                  setPostInput({ ...postInput, title: e.target.value })
                }
              />
            </MyBox>
            <MyBox>
              <Box>
                <BookIcon size={24} />
              </Box>

              <Textarea
                placeholder="Enter post body"
                //   onChange={handleChange}
                //   value={value}

                onChange={(e) =>
                  setPostInput({ ...postInput, body: e.target.value })
                }
                sx={{
                  bg: "transparent",
                  border: "1px solid #444C56",
                  width: "100%",
                  //   height: "40px",
                  borderRadius: "3px",
                  marginInlineStart: "15px",
                }}
              />
            </MyBox>
            <MyBox>
              <Box>
                <HashIcon size={24} />
              </Box>

              <TextInputWithTokens
                tokens={postInput.tags}
                onTokenRemove={onTokenRemove}
                disabled
                // placeholder="Choose tag for your post"
                sx={{
                  bg: "transparent",
                  border: "1px solid #444C56",
                  width: "100%",
                  height: "auto",
                  borderRadius: "3px",
                  marginInlineStart: "15px",
                }}
              />
            </MyBox>
            <MyBox>
              <Box
                sx={{
                  bg: "transparent",
                  //   border: "1px solid #444C56",
                  width: "100%",
                  height: "50px",
                  borderRadius: "3px",
                  marginInlineStart: "40px",
                }}
              >
                {tokens.map((token) => (
                  <IssueLabelToken
                    key={token.id}
                    text={`${token.text}`}
                    size="large"
                    fillColor="#444C56"
                    style={{
                      padding: "13px 20px",
                      marginRight: "8px",
                      marginBottom: "8px",
                      cursor: "pointer",
                    }}
                    onClick={() => onTokenAdd(token)}
                  />
                ))}
              </Box>
            </MyBox>
            <MyBox>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                margin="0px 0 0 40px"
                padding="10px"
                width="100%"
                border="1px solid #444C56"
                sx={{
                  cursor: "pointer",
                  ":hover": {
                    opacity: 0.7,
                  },
                }}
                onClick={onSubmit}
              >
                <StyledOcticon icon={RocketIcon} size={18} sx={{ mr: "8px" }} />
                <Text
                  sx={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: "600",
                    color: "#006EED",
                  }}
                >
                  Post
                </Text>
              </Box>
            </MyBox>
          </>
        </Dialog>
      )}
    </Box>
  );
};

export default PostDialog;

// customize box
const MyBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 20px 25px;
`;
