'use client'
import { AlertDialog, Button, Flex } from "@radix-ui/themes"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";


const DeleteIssueButton = ( {issueId} : {issueId : number}) => {
  const [error,setError] = useState(false);
  const router = useRouter();
  const deleteIssue = async () => {
    try {
      //throw new Error();
      await axios.delete('/api/issues/'+issueId);
      router.refresh();
      router.push('/issues');                  
    } catch (error) {
      setError(true)
    }
  }
  return (
    <>
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color = "red">Delete Issue</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>Are you sure you want to delete this issue? This action cannot be undone</AlertDialog.Description>
        <Flex gap="3" mt="4">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="red" onClick={deleteIssue}>
              Delete Issue
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
    <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>This issue could not be deleted.</AlertDialog.Description>
          <Button color="gray" variant="soft" mt="2" onClick={() => setError(false)}>OK</Button>
        </AlertDialog.Content>
    </AlertDialog.Root>
    </>
  )
}

export default DeleteIssueButton

function userRouter() {
  throw new Error("Function not implemented.");
}
