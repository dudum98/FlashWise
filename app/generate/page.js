"use client";

import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { collection, doc, getDoc, writeBatch } from "firebase/firestore";

export default function Generate() {
  const [text, setText] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [setName, setSetName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState([]);

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  const handleFlipClick = (index) => {
    setIsFlipped((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const saveFlashcards = async () => {
    if (!setName.trim()) {
      alert("Please enter a name for your flashcard set.");
      return;
    }

    try {
      const userDocRef = doc(collection(db, "users"), user.id);
      const userDocSnap = await getDoc(userDocRef);

      const batch = writeBatch(db);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const updatedSets = [
          ...(userData.flashcardSets || []),
          { name: setName },
        ];
        batch.update(userDocRef, { flashcardSets: updatedSets });
      } else {
        batch.set(userDocRef, { flashcardSets: [{ name: setName }] });
      }

      const setDocRef = doc(collection(userDocRef, "flashcardSets"), setName);
      batch.set(setDocRef, { flashcards });

      await batch.commit();

      alert("Flashcards saved successfully!");
      handleCloseDialog();
      setSetName("");
    } catch (error) {
      console.error("Error saving flashcards:", error);
      alert("An error occurred while saving flashcards. Please try again.");
    }
  };

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert("Please enter some text to generate flashcards.");
      return;
    }

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: text,
      });

      const outerString = await response.text();
      const parsedOuter = JSON.parse(outerString);
      const innerJsonString = parsedOuter.flashcards;

      const cleanedInnerJsonString = innerJsonString.replace(/\n/g, "");
      const finalObject = JSON.parse(cleanedInnerJsonString);

      setFlashcards(finalObject.flashcards);
      setIsFlipped(Array(finalObject.flashcards.length).fill(false));
    } catch (error) {
      console.error("Error generating flashcards:", error);
      alert("An error occurred while generating flashcards. Please try again.");
    }
  };

  return (
    <div className="flashcard-page">
    <Container className="flashcard-container"  maxWidth="md" >
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Generate Flashcards
        </Typography>

        <TextField
          className="textfield"
          value={text}
          onChange={(e) => setText(e.target.value)}
          label="Enter text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          sx={{
            mb: 2,
            "& .MuiInputBase-input": { color: "white" },
         
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
        >
          Generate Flashcards
        </Button>
        {flashcards.length > 0 && (
          <>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Generated Flashcards
              </Typography>
              <Grid container spacing={2}>
                {flashcards.map((flashcard, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <ReactCardFlip
                      isFlipped={isFlipped[index]}
                      flipDirection="horizontal"
                    >
                      <Card
                        onClick={() => handleFlipClick(index)}
                        sx={{ cursor: "pointer" }}
                      >
                        <CardContent>
                          <Typography variant="h6"></Typography>
                          <Typography>{flashcard.front}</Typography>
                        </CardContent>
                      </Card>
                      <Card
                        onClick={() => handleFlipClick(index)}
                        sx={{ cursor: "pointer" }}
                      >
                        <CardContent>
                          <Typography variant="h6"></Typography>
                          <Typography>{flashcard.back}</Typography>
                        </CardContent>
                      </Card>
                    </ReactCardFlip>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenDialog}
              >
                Save Flashcards
              </Button>
            </Box>

            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
              <DialogTitle>Save Flashcard Set</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please enter a name for your flashcard set.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Set Name"
                  type="text"
                  fullWidth
                  value={setName}
                  onChange={(e) => setSetName(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button onClick={saveFlashcards} color="primary">
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </Box>
    </Container>
    </div>
  );
}