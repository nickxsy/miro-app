import { Card } from '@/shared/ui';

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
        <Card.Root className="w-full max-w-[400px]">
          <Card.Header>
            <Card.Title>{title}</Card.Title>
            {description && <Card.Description>{description}</Card.Description>}
          </Card.Header>
          <Card.Content>{form}</Card.Content>
          <Card.Footer>
            <p className="text-sm">{footerText}</p>
          </Card.Footer>
        </Card.Root>
      </div>
    </main>
  );
}
