"use client";
import React, { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDeepResearchStore } from "@/store/deepResearch";

const formSchema = z.object({
  answer: z.string().min(1, "Answer is required!"),
});

const QuestionForm = () => {
  const {
    questions,
    currentQuestion,
    answers,
    setCurrentQuestion,
    setAnswers,
    setIsCompleted,
    isLoading,
  } = useDeepResearchStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answer: answers[currentQuestion] || "",
    },
  });

  // Reset form when currentQuestion changes
  useEffect(() => {
    form.reset({
      answer: answers[currentQuestion] || "",
    });
  }, [currentQuestion, answers, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = values.answer;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsCompleted(true);
    }
  }

  if (!questions || questions.length === 0) {
    return null;
  }

  return (
    <Card className="w-[90vw] sm:w-[80vw] xl:w-[50vw] bg-white/60 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-base text-primary/50">
          Question {currentQuestion + 1} of {questions.length}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <CardTitle className="text-lg mb-4">
                    {questions[currentQuestion]}
                  </CardTitle>
                  <FormControl>
                    <Textarea
                      placeholder="Type your answer here"
                      className="resize-y h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center">
              <Button
                type="button"
                variant={"outline"}
                onClick={() => {
                  if (currentQuestion > 0) {
                    setCurrentQuestion(currentQuestion - 1);
                    form.reset({
                      answer: answers[currentQuestion - 1] || "",
                    });
                  }
                }}
                disabled={currentQuestion === 0 || isLoading}
              >
                Previous
              </Button>
              <Button type="submit" disabled={isLoading}>
                {currentQuestion === questions.length - 1 ? "Complete" : "Next"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default QuestionForm;