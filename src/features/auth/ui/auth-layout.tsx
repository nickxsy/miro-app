import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/shared/ui/kit/card';

export function AuthLayout({
  form,
  title,
  description,
  footerText
}: {
  form: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  footerText?: React.ReactNode;
}) {
  return (
    <main className="grow pt-[80px]">
      <div className="flex items-center justify-center">
        <Card className="w-full max-w-[400px]">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
          <CardContent>{form}</CardContent>
          <CardFooter>
            <p className="text-sm">{footerText}</p>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
