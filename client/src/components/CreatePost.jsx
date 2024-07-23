import { AddIcon } from "@chakra-ui/icons";
import { Button, FormControl, Modal, useColorMode, useColorModeValue, useDisclosure,ModalOverlay,ModalFooter,ModalContent,ModalHeader, Input } from "@chakra-ui/react";

import { ModalCloseButton,ModalBody } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import usePreviewImg from "../hooks/usePreviewImg";
import { useRef } from "react";
import { BsFillImageFill } from "react-icons/bs";
const CreatePost =  ()=>{
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { handleImageChange, imgUrl } = usePreviewImg();

    const imageref = useRef(null);
return (
    <>
    <Button
    position={"fixed"}
    bottom={10}
    right={10}
    leftIcon={<AddIcon />}
    bg={useColorModeValue("gray.300","gray.dark")}
    onClick={onOpen}

>
        Post
    </Button>

    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            
            <FormControl>
              <Textarea 
              placeholder="Post conteent here.."
              // onChange={handle}
              // value={postText}
              />
<Text
fontWeight={"bold"}
textAlign={"right"}
color={"gray.800"}
>
  500/500
</Text>
<Input 
type="file"
hidden
ref={imageref}
onChange={handleImageChange}
/>
<BsFillImageFill
style={{marginLeft:"5px", cursor:"pointer"}}
onClick={()=> imageref.current.click()}
/>

            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
)

}

export  default CreatePost;