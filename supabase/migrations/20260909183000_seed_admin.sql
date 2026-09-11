-- Confirm the admin user if they exist
UPDATE auth.users
SET email_confirmed_at = NOW()
WHERE email = 'admin@shandilyaschool.edu.in';

-- Assign the admin role to the user
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE email = 'admin@shandilyaschool.edu.in'
ON CONFLICT (user_id, role) DO NOTHING;
