using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace JWTTokenAuthentication.Models
{
    public partial class MonikaContext : DbContext
    {
        public MonikaContext()
        {
        }

        public MonikaContext(DbContextOptions<MonikaContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AssignSubject> AssignSubject { get; set; }
        public virtual DbSet<Course> Course { get; set; }
        public virtual DbSet<Question> Question { get; set; }
        public virtual DbSet<Registration> Registration { get; set; }
        public virtual DbSet<Role> Role { get; set; }
        public virtual DbSet<StudentAssignCourse> StudentAssignCourse { get; set; }
        public virtual DbSet<StudentRemarks> StudentRemarks { get; set; }
        public virtual DbSet<Subject> Subject { get; set; }
        public virtual DbSet<Test> Test { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=DESKTOP-S9TL2E5;Initial Catalog=Monika;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AssignSubject>(entity =>
            {
                entity.HasKey(e => e.Assignid)
                    .HasName("PK__AssignSu__A1289C7BD5D39C44");

                entity.Property(e => e.Assignid).HasColumnName("assignid");

                entity.Property(e => e.IsActive)
                    .HasColumnName("isActive")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Regidref).HasColumnName("regidref");

                entity.Property(e => e.Subjectidref).HasColumnName("subjectidref");

                entity.HasOne(d => d.RegidrefNavigation)
                    .WithMany(p => p.AssignSubject)
                    .HasForeignKey(d => d.Regidref)
                    .HasConstraintName("FK__AssignSub__regid__31EC6D26");

                entity.HasOne(d => d.SubjectidrefNavigation)
                    .WithMany(p => p.AssignSubject)
                    .HasForeignKey(d => d.Subjectidref)
                    .HasConstraintName("FK__AssignSub__subje__1B0907CE");
            });

            modelBuilder.Entity<Course>(entity =>
            {
                entity.Property(e => e.Courseid).HasColumnName("courseid");

                entity.Property(e => e.Coursename)
                    .HasColumnName("coursename")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.IsActive)
                    .HasColumnName("isActive")
                    .HasDefaultValueSql("((0))");
            });

            modelBuilder.Entity<Question>(entity =>
            {
                entity.Property(e => e.Questionid).HasColumnName("questionid");

                entity.Property(e => e.Answer)
                    .HasColumnName("answer")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.IsActive)
                    .HasColumnName("isActive")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Option1)
                    .HasColumnName("option1")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Option2)
                    .HasColumnName("option2")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Option3)
                    .HasColumnName("option3")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Option4)
                    .HasColumnName("option4")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Question1)
                    .HasColumnName("question")
                    .IsUnicode(false);

                entity.Property(e => e.Testidref).HasColumnName("testidref");

                entity.HasOne(d => d.TestidrefNavigation)
                    .WithMany(p => p.Question)
                    .HasForeignKey(d => d.Testidref)
                    .HasConstraintName("FK__Question__testid__44FF419A");
            });

            modelBuilder.Entity<Registration>(entity =>
            {
                entity.HasKey(e => e.Regid)
                    .HasName("PK__tmp_ms_x__184A6B04AFEA0D0E");

                entity.Property(e => e.Regid).HasColumnName("regid");

                entity.Property(e => e.Email)
                    .HasColumnName("email")
                    .HasMaxLength(254)
                    .IsUnicode(false);

                entity.Property(e => e.Firstname)
                    .HasColumnName("firstname")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.IsActive)
                    .HasColumnName("isActive")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Lastname)
                    .HasColumnName("lastname")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .HasColumnName("password")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Roleid).HasColumnName("roleid");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Registration)
                    .HasForeignKey(d => d.Roleid)
                    .HasConstraintName("FK__Registrat__rolei__30F848ED");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(e => e.Roleid).HasColumnName("roleid");

                entity.Property(e => e.IsActive)
                    .HasColumnName("isActive")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Rolename)
                    .HasColumnName("rolename")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<StudentAssignCourse>(entity =>
            {
                entity.HasKey(e => e.Stdassignid)
                    .HasName("PK__StudentA__7F6AAEBA4EDFAFF4");

                entity.Property(e => e.Stdassignid).HasColumnName("stdassignid");

                entity.Property(e => e.Regidref).HasColumnName("regidref");

                entity.Property(e => e.Stdcourseid).HasColumnName("stdcourseid");

                entity.HasOne(d => d.RegidrefNavigation)
                    .WithMany(p => p.StudentAssignCourse)
                    .HasForeignKey(d => d.Regidref)
                    .HasConstraintName("FK__StudentAs__regid__398D8EEE");

                entity.HasOne(d => d.Stdcourse)
                    .WithMany(p => p.StudentAssignCourse)
                    .HasForeignKey(d => d.Stdcourseid)
                    .HasConstraintName("FK__StudentAs__stdco__3A81B327");
            });

            modelBuilder.Entity<StudentRemarks>(entity =>
            {
                entity.HasKey(e => e.Studentremarkid)
                    .HasName("PK__StudentR__B484B0328C89CBA0");

                entity.Property(e => e.Studentremarkid).HasColumnName("studentremarkid");

                entity.Property(e => e.Obtained).HasColumnName("obtained");

                entity.Property(e => e.Regidref).HasColumnName("regidref");

                entity.Property(e => e.Subjectidref).HasColumnName("subjectidref");

                entity.Property(e => e.Testidref).HasColumnName("testidref");

                entity.Property(e => e.Total).HasColumnName("total");

                entity.HasOne(d => d.RegidrefNavigation)
                    .WithMany(p => p.StudentRemarks)
                    .HasForeignKey(d => d.Regidref)
                    .HasConstraintName("FK__StudentRe__regid__32E0915F");

                entity.HasOne(d => d.SubjectidrefNavigation)
                    .WithMany(p => p.StudentRemarks)
                    .HasForeignKey(d => d.Subjectidref)
                    .HasConstraintName("FK__StudentRe__subje__2E1BDC42");

                entity.HasOne(d => d.TestidrefNavigation)
                    .WithMany(p => p.StudentRemarks)
                    .HasForeignKey(d => d.Testidref)
                    .HasConstraintName("FK__StudentRe__testi__45F365D3");
            });

            modelBuilder.Entity<Subject>(entity =>
            {
                entity.Property(e => e.Subjectid).HasColumnName("subjectid");

                entity.Property(e => e.Courseidref).HasColumnName("courseidref");

                entity.Property(e => e.IsActive)
                    .HasColumnName("isActive")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Sname)
                    .HasColumnName("sname")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.CourseidrefNavigation)
                    .WithMany(p => p.Subject)
                    .HasForeignKey(d => d.Courseidref)
                    .HasConstraintName("FK__Subject__coursei__173876EA");
            });

            modelBuilder.Entity<Test>(entity =>
            {
                entity.Property(e => e.Testid).HasColumnName("testid");

                entity.Property(e => e.Assignidref).HasColumnName("assignidref");

                entity.Property(e => e.IsActive).HasColumnName("isActive");

                entity.Property(e => e.Subjectidref).HasColumnName("subjectidref");

                entity.Property(e => e.Testname)
                    .HasColumnName("testname")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.AssignidrefNavigation)
                    .WithMany(p => p.Test)
                    .HasForeignKey(d => d.Assignidref)
                    .HasConstraintName("FK__Test__assignidre__440B1D61");

                entity.HasOne(d => d.SubjectidrefNavigation)
                    .WithMany(p => p.Test)
                    .HasForeignKey(d => d.Subjectidref)
                    .HasConstraintName("FK__Test__subjectidr__46E78A0C");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
